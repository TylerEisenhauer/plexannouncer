import express from 'express'
import {PlexEvent} from '../types/plexEvent'
import {MessageEmbed, MessageAttachment, WebhookClient} from 'discord.js'

interface MulterRequest extends express.Request {
    file: any;
}

const handlePlexWebhook = async (req: MulterRequest, res: express.Response) => {
    const plexEvent: PlexEvent = JSON.parse(req.body.payload)

    if (plexEvent.event !== 'library.new' || plexEvent.Metadata.type === 'track') {
        return res.sendStatus(204)
    }

    const embedTitle: string =
        plexEvent.Metadata.type === 'movie' ?
        `${plexEvent.Metadata.title}` :
        `${plexEvent.Metadata.grandparentTitle}, ${plexEvent.Metadata.parentTitle}: ${plexEvent.Metadata.title}`

    const embedAuthor: string =
        plexEvent.Metadata.type === 'movie' ?
            `Movie Added` :
            `Episode Added`

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
        .attachFiles([attachment])
        .setThumbnail('attachment://img.jpeg')
        .setDescription(plexEvent.Metadata.summary ? plexEvent.Metadata.summary : 'Summary not available')

    await new WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN).send(embed)
}

export default {
    handlePlexWebhook
}