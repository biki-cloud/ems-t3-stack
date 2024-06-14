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
    const [query, setQuery] = useState('');

    const { data: events, isLoading, refetch } = trpc.event.getEvents.useQuery({
        limit,
        offset,
        query: query,
    }, {
        //  オプションにより、新しいデータがロードされる間、前のデータが表示され続けます。
        keepPreviousData: true,
    });

    const handleSearch = () => {
        setQuery(searchTerm); // 検索ボタンが押された時にクエリを設定
        refetch(); // クエリを手動で再実行
    };

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
            {isLoading && <div>検索中です</div>}
            <div className="space-y-5">
                {events && events.events.length > 0 ? (
                    events.events.map((event) => (
                        <EventItem
                            key={event.id}
                            event={{
                                ...event,
                                createdAt: new Date(event.createdAt),
                                updatedAt: new Date(event.updatedAt)
                            }}
                        />
                    ))
                ) : (
                    <div className="text-center text-sm text-gray-500">投稿はありません</div>
                )}
            </div>
            {events && events.totalEvents && events.events.length > 0 && (
                <PaginationButton pageCount={Math.ceil(events.totalEvents / limit)} displayPerPage={eventPerPage} />
            )}
        </div>
    )

}

export default EventList