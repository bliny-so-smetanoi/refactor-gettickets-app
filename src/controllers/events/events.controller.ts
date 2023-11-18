import {Body, Controller, Get, HttpStatus, Param, Req, Res} from '@nestjs/common';
import {EventsService} from "../../services/events/events.service";
import {Events} from "../../models/Events";
import {SearchEventDto} from "../../dtos/search.event.dto";

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {
    }

    @Get('/')
    async getEvent(@Res() res, @Req() req): Promise<void> {
        try {
            const result = await this.eventsService.getEvents()

            res.status(HttpStatus.OK).json(result)
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).json({message: e.message})
        }
    }

    @Get('/search')
    async searchEvents(@Res() res, @Req() req, @Body() searchEventDto: SearchEventDto) {
        try {
            const result = await this.eventsService.searchEvents(searchEventDto.searchQuery)

            res.status(HttpStatus.OK).json(result)
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).json({message: e.message})
        }
    }

    @Get('/:id')
    async getEventById(@Res() res, @Req() req, @Param() id: any): Promise<void> {
        try {

            const result = await this.eventsService.getOneEvent(id.id)

            res.status(HttpStatus.OK).json(result)
        } catch (e) {
            res.status(HttpStatus.BAD_REQUEST).json({message: e.message})
        }
    }


}
