import { AttachmentBuilder, EmbedBuilder, WebhookClient } from 'discord.js'
import express from 'express'
import { PlexEvent } from '../types/plexEvent.js'

interface MulterRequest extends express.Request {
  file: any;
}

const handlePlexWebhook = async (req: MulterRequest, res: express.Response) => {
  console.log('hit the hook')
  if (!req.body.payload) return res.sendStatus(204)
  const plexEvent: PlexEvent = JSON.parse(req.body.payload)

  if (plexEvent.event !== 'library.new' || plexEvent.Metadata.type === 'track') {
    return res.sendStatus(204)
  }

  console.log(`Processing Event\nType: ${plexEvent.Metadata.type}`)

  const embedTitle: string = buildEmbedTitle(plexEvent)

  const embedAuthor: string = `${plexEvent.Metadata.type.charAt(0).toUpperCase()}${plexEvent.Metadata.type.slice(1)} Added`

  let attachment: AttachmentBuilder
  if (req.file && req.file.buffer) {
    attachment = new AttachmentBuilder(req.file.buffer, { name: 'img.jpeg' })
  } else {
    console.log('Could not get thumbnail')
  }

  const embed: EmbedBuilder = new EmbedBuilder()
    .setColor('#E5A00D')
    .setAuthor({
      name: embedAuthor
    })
    .setTitle(embedTitle)
    .setURL('https://app.plex.tv/')
    .setThumbnail('attachment://img.jpeg')
    .setDescription(plexEvent.Metadata.summary ? plexEvent.Metadata.summary : 'Summary not available')

  await new WebhookClient({
    id: process.env.WEBHOOK_ID,
    token: process.env.WEBHOOK_TOKEN
  })
    .send({
      embeds: [embed], files: [attachment]
    })

  return res.sendStatus(202)
}

const buildEmbedTitle = (plexEvent: PlexEvent): string => {
  return plexEvent.Metadata.type === 'episode' ?
    `${plexEvent.Metadata.grandparentTitle}, ${plexEvent.Metadata.parentTitle} Episode ${plexEvent.Metadata.index}: ${plexEvent.Metadata.title}` :
    `${plexEvent.Metadata.title}`
}

export default {
  handlePlexWebhook
}
