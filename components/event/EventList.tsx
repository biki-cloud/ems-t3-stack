'use client'

import { trpc } from "@/trpc/react"
import PaginationButton from "../pagers/PaginationButton"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import EventItem from "./EventItem"
import { eventPerPage } from "@/lib/utils"
import { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import genreMapping from "../objects/mapping";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';

interface props {
    limit: number
    offset: number
}

const EventList = ({ limit, offset }: props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [query, setQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const { data: events, isLoading, refetch } = trpc.event.getEvents.useQuery({
        limit,
        offset,
        query: query,
        genre: selectedGenre,
    }, {
        keepPreviousData: true,
    });

    useEffect(() => {
        const search = searchParams.get('search') || '';
        const genre = searchParams.get('genre') || '';
        setSearchTerm(search);
        setSelectedGenre(genre);
        setQuery(search);
        refetch();
    }, [searchParams]);

    const handleSearch = () => {
        setQuery(searchTerm);
        refetch();
        const queryString = new URLSearchParams({ search: searchTerm, genre: selectedGenre }).toString();
        router.push(`${pathname}?${queryString}`);
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
                <Button id="event-search-button-id" variant="default" onClick={handleSearch}><SearchIcon /></Button>

            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">{selectedGenre ? genreMapping[selectedGenre] : "ジャンルを選択"}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem key="none" onClick={() => {
                        setSelectedGenre('');
                        const queryString = new URLSearchParams({ search: searchTerm, genre: '' }).toString();
                        router.push(`${pathname}?${queryString}`);
                    }}>
                        ジャンル選択なし
                    </DropdownMenuItem>
                    {Object.keys(genreMapping).map((genre) => (
                        <DropdownMenuItem key={genre} onClick={() => {
                            setSelectedGenre(genre);
                            const queryString = new URLSearchParams({ search: searchTerm, genre }).toString();
                            router.push(`${pathname}?${queryString}`);
                        }}>
                            {genreMapping[genre]}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            {isLoading && <div>検索中です</div>}
            <div className="space-y-5">
                {events && events.events.length > 0 ? (
                    events.events.map((event) => (
                        <EventItem
                            key={event.id}
                            event={{
                                ...event,
                                createdAt: new Date(event.createdAt),
                                updatedAt: new Date(event.updatedAt),
                                user: {
                                    ...event.user,
                                    emailVerified: event.user.emailVerified ? new Date(event.user.emailVerified) : null,
                                    createdAt: new Date(event.user.createdAt),
                                    updatedAt: new Date(event.user.updatedAt),
                                    organizer: event.user.organizer ? { ...event.user.organizer, createdAt: new Date(event.user.organizer.createdAt), updatedAt: new Date(event.user.organizer.updatedAt) } : null,
                                    vendor: event.user.vendor ? { ...event.user.vendor, createdAt: new Date(event.user.vendor.createdAt), updatedAt: new Date(event.user.vendor.updatedAt) } : null,
                                    customer: event.user.customer ? { ...event.user.customer, createdAt: new Date(event.user.customer.createdAt), updatedAt: new Date(event.user.customer.updatedAt) } : null,
                                }
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