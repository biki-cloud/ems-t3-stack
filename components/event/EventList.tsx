'use client'

import { trpc } from "@/trpc/react"
import PaginationButton from "../pagers/PaginationButton"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import EventItem from "./EventItem"
import { eventPerPage } from "@/lib/utils"
import { useState } from 'react';

interface props {
    limit: number
    offset: number
}

const EventList = ({ limit, offset }: props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: events, isLoading, refetch } = trpc.event.getEvents.useQuery({
        limit,
        offset,
        query: searchTerm,
    }, {
        keepPreviousData: true,
    });

    const handleSearch = () => {
        refetch();
    };

    const totalEvents = events?.totalEvents
    if (!totalEvents) return null

    const pageCount = Math.ceil(totalEvents / limit)

    if (isLoading) return <div>Loading...</div>;
    if (!events) return <div>No events found.</div>;

    return (
        <div className="space-y-5">
            <div className="flex mb-4">
                <Input
                    className="flex-1 mr-2"
                    placeholder="イベント名"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="default" onClick={handleSearch}>検索</Button>
            </div>
            <div className="space-y-5">
                {events.events.length === 0 && (
                    <div className="text-center text-sm text-gray-500">投稿はありません</div>
                )}
                {events.events.map((event) => (
                    <EventItem
                        key={event.id}
                        event={{
                            ...event,
                            createdAt: new Date(event.createdAt),
                            updatedAt: new Date(event.updatedAt)
                        }}
                    />
                ))}
            </div>

            {events.events.length !== 0 && (
                <PaginationButton pageCount={pageCount} displayPerPage={eventPerPage} />
            )}
        </div>
    )

}

export default EventList