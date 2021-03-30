import express from 'express'
import {PlexEvent} from '../types/plexEvent'
import {MessageEmbed, MessageAttachment, WebhookClient} from 'discord.js'

interface MulterRequest extends express.Request {
    file: any;
}

const handlePlexWebhook = async (req: MulterRequest, res: express.Response): Promise<express.Response> => {
    if (!req.body.payload) return res.sendStatus(204)
    const plexEvent: PlexEvent = JSON.parse(req.body.payload)

    if (plexEvent.event !== 'library.new' || plexEvent.Metadata.type === 'track') {
        return res.sendStatus(204)
    }

    const embedTitle: string = buildEmbedTitle(plexEvent)

    const embedAuthor: string = `${plexEvent.Metadata.type.charAt(0).toUpperCase()}${plexEvent.Metadata.type.slice(1)} Added`

    let attachment: MessageAttachment
    if (req.file && req.file.buffer) {
        attachment = new MessageAttachment(req.file.buffer, 'img.jpeg')
    } else {
        console.log('Could not get thumbnail')
    }

    const embed: MessageEmbed = new MessageEmbed()
        .setColor('#E5A00D')
        .setAuthor(embedAuthor)
        .setTitle(embedTitle)
        .setURL('https://app.plex.tv/')
        .attachFiles([attachment])
        .setThumbnail('attachment://img.jpeg')
        .setDescription(plexEvent.Metadata.summary ? plexEvent.Metadata.summary : 'Summary not available')

    await new WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN).send(embed)

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
