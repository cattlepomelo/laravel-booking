import { Head, Link } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { Button } from '@/Components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

// Featured destinations data
const featuredDestinations = [
    {
        id: 1,
        name: 'New York',
        country: 'USA',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Experience the city that never sleeps',
        popularFlights: 124
    },
    {
        id: 2,
        name: 'Paris',
        country: 'France',
        image: 'https://images.unsplash.com/photo-1512673479898-0c868f2c6f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'The city of love and lights',
        popularFlights: 98
    },
    {
        id: 3,
        name: 'Tokyo',
        country: 'Japan',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Discover the blend of tradition and technology',
        popularFlights: 156
    },
    {
        id: 4,
        name: 'Sydney',
        country: 'Australia',
        image: 'https://images.unsplash.com/photo-1523482580672-fb43b7e28f8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Beautiful harbor city with iconic landmarks',
        popularFlights: 76
    }
];

interface DashboardProps {
    flightsCount?: number;
    activeBookingsCount?: number;
    passengersCount?: number;
    destinationsCount?: number;
}

export default function Dashboard(props: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Welcome section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Welcome to SkyTravel</h1>
                    <p className="text-lg text-gray-600">Your gateway to amazing destinations around the world</p>
                </div>

                {/* Featured Destinations */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Featured Destinations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredDestinations.map(destination => (
                            <div key={destination.id} className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border shadow-md">
                                <img 
                                    src={destination.image} 
                                    alt={destination.name} 
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold">{destination.name}, {destination.country}</h3>
                                    <p className="text-gray-600 mt-2">{destination.description}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="text-sm text-gray-500">{destination.popularFlights} flights</span>
                                        <Link href="/flights">
                                            <Button variant="outline" size="sm">
                                                Explore
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Management Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Flight Booking Management</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/book-flight">
                            <Button variant="outline" className="w-full h-24 text-lg">
                                <div className="text-left">
                                    <h3 className="font-semibold">Book a Flight</h3>
                                    <p className="text-sm text-gray-600 mt-1">Search and book flights</p>
                                </div>
                            </Button>
                        </Link>
                        
                        <Link href="/flights">
                            <Button variant="outline" className="w-full h-24 text-lg">
                                <div className="text-left">
                                    <h3 className="font-semibold">Manage Flights</h3>
                                    <p className="text-sm text-gray-600 mt-1">View, create, edit, and delete flights</p>
                                </div>
                            </Button>
                        </Link>
                        
                        <Link href="/bookings">
                            <Button variant="outline" className="w-full h-24 text-lg">
                                <div className="text-left">
                                    <h3 className="font-semibold">Manage Bookings</h3>
                                    <p className="text-sm text-gray-600 mt-1">View, create, edit, and delete bookings</p>
                                </div>
                            </Button>
                        </Link>
                    </div>
                </div>
                
                {/* Stats Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Quick Stats</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h3 className="text-2xl font-bold text-blue-700">{props.flightsCount || 0}</h3>
                            <p className="text-gray-600">Total Flights</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <h3 className="text-2xl font-bold text-green-700">{props.activeBookingsCount || 0}</h3>
                            <p className="text-gray-600">Active Bookings</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <h3 className="text-2xl font-bold text-purple-700">{props.passengersCount || 0}</h3>
                            <p className="text-gray-600">Passengers</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <h3 className="text-2xl font-bold text-orange-700">{props.destinationsCount || 0}</h3>
                            <p className="text-gray-600">Destinations</p>
                        </div>
                    </div>
                </div>
                
                {/* Placeholder for other content */}
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border mt-8">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}