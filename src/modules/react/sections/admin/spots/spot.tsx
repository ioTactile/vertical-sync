'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/_components/ui/tabs';
import { CLIMBING_SPOT_DIFFICULTY_LABELS, CLIMBING_SPOT_TYPE_LABELS } from '@/types/enum';
import { CircleParking, CircleParkingOff, Globe, Mail, MapPin, Phone, Toilet } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { useGetFetchQuery } from '@/modules/core/hooks/use-get-fetch-climbing-spot';
import { redirect, useParams } from 'next/navigation';

const Spot = () => {
  const [activeTab, setActiveTab] = React.useState<'infos' | 'images'>('infos');

  const { id } = useParams();
  const { data: spot, isError } = useGetFetchQuery(id as string);

  if (!spot && isError) {
    redirect('/admin/spots');
  }

  if (!spot) return null;

  return (
    <div className="container mx-auto flex flex-col gap-6 mt-2 px-4 sm:px-0">
      <h1 className="text-2xl lg:text-3xl font-bold">Détails du Spot</h1>

      {spot && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">{spot.name}</h2>
            <p className="text-muted-foreground">{spot.description}</p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as 'infos' | 'images')}
          >
            <TabsList className="w-full">
              <TabsTrigger value="infos" className="w-full">
                Informations
              </TabsTrigger>
              <TabsTrigger value="images" className="w-full">
                Images
              </TabsTrigger>
            </TabsList>

            <TabsContent value="infos" className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Difficultés</h3>
                  <div className="flex flex-wrap gap-2">
                    {spot.difficulties.map((difficulty, index) => (
                      <span key={difficulty} className="text-muted-foreground">
                        {CLIMBING_SPOT_DIFFICULTY_LABELS[difficulty]}{' '}
                        {index < spot.difficulties.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {spot.types.map((type, index) => (
                      <span key={type} className="text-muted-foreground">
                        {CLIMBING_SPOT_TYPE_LABELS[type]} {index < spot.types.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Contact</h3>
                  {spot.address || spot.websiteUrl || spot.phoneNumber || spot.email ? (
                    <div className="space-y-2">
                      {spot.address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          <span>{spot.address}</span>
                        </div>
                      )}
                      {spot.websiteUrl && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-primary" />
                          <a href={spot.websiteUrl} target="_blank" rel="noopener noreferrer">
                            {spot.websiteUrl}
                          </a>
                        </div>
                      )}
                      {spot.phoneNumber && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-5 w-5 text-primary" />
                          <span>{spot.phoneNumber}</span>
                        </div>
                      )}
                      {spot.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-primary" />
                          <span>{spot.email}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Aucun contact disponible</span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Équipements</h3>
                  <div className="flex gap-4">
                    {spot.toiletsAvailable && <Toilet className="h-6 w-6 text-primary" />}
                    {spot.parkingAvailable ? (
                      <CircleParking className="h-6 w-6 text-primary" />
                    ) : (
                      <CircleParkingOff className="h-6 w-6 text-primary" />
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="images" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {spot.imageUrls.length > 0 ? (
                spot.imageUrls.map((imageUrl, index) => (
                  <Image
                    key={index}
                    src={imageUrl}
                    alt={`${spot.name} - Image ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                ))
              ) : (
                <span className="text-muted-foreground">Aucune image disponible</span>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Spot;
