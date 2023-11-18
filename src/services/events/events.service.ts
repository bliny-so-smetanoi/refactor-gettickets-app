import { Injectable } from '@nestjs/common';
import {Events, EventsDocument} from "../../models/Events";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {SeatsDocument} from "../../models/Seats";

@Injectable()
export class EventsService {
    constructor(@InjectModel('events') private readonly eventsModel: Model<EventsDocument>,
                @InjectModel('seats') private readonly seatsModel: Model<SeatsDocument>) {
    }

    async getEvents(): Promise<Events[]> {
        try {
            return this.eventsModel.find(null, 'name artist image date_time address').sort({date_time: 'ascending'})
        } catch (e) {
            throw e
        }
    }

    async getOneEvent(id: string): Promise<object> {
        try {
            const event = await this.eventsModel.findOne({ _id: id})
            const seats = await this.seatsModel.find({owner: id})

            return {event, seats}
        } catch (e) {
            throw e
        }
    }

    async searchEvents(search: string): Promise<Events[]> {
        try {
            const trimmedString = search.trim()

            if(trimmedString === ''  || trimmedString === trimmedString[0]) {
                const result = await this.eventsModel.find(null, 'name artist image date_time address').sort({date_time: 'ascending'})
                return
            }

            const regex = new RegExp(trimmedString, 'i')
            const result = await this.eventsModel.find({artist: regex}).sort({date_time: 'ascending'})

            return result
        } catch (e) {
            throw e
        }
    }
}
