"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import {
  CLIMBING_SPOT_DIFFICULTY_LABELS,
  CLIMBING_SPOT_TYPE_LABELS,
} from "@/types/enum";
import {
  CircleParking,
  CircleParkingOff,
  Globe,
  Mail,
  MapPin,
  Phone,
  Toilet,
} from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useGetFetchQuery } from "@/modules/core/hooks/use-get-fetch-climbing-spot";
import { redirect, useParams } from "next/navigation";

const Spot = () => {
  const [activeTab, setActiveTab] = React.useState<"infos" | "images">("infos");

  const { id } = useParams();
  const { data: spot, isError } = useGetFetchQuery(id as string);

  if (!spot && isError) {
    redirect("/admin/spots");
  }

  if (!spot) return null;

  return (
    <div className="container mx-auto flex flex-col gap-6 mt-2 px-4 sm:px-0">
      <h1 className="text-2xl lg:text-3xl font-bold">Détails du Spot</h1>

      {spot && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold">{spot.name}</h2>
              <p className="text-gray-500">{spot.description}</p>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as "infos" | "images")
              }
            >
              <TabsList>
                <TabsTrigger value="infos">Informations</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>

              <TabsContent value="infos" className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold">Difficultés</h3>
                    <div className="flex flex-wrap gap-2">
                      {spot.difficulties.map((difficulty) => (
                        <span key={difficulty} className="text-gray-600">
                          {CLIMBING_SPOT_DIFFICULTY_LABELS[difficulty]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold">Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {spot.types.map((type) => (
                        <span key={type} className="text-gray-600">
                          {CLIMBING_SPOT_TYPE_LABELS[type]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold">Contact</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>{spot.address}</span>
                      </div>
                      {spot.websiteUrl && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-primary" />
                          <a
                            href={spot.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold">Équipements</h3>
                    <div className="flex gap-4">
                      {spot.toiletsAvailable && (
                        <Toilet className="h-6 w-6 text-primary" />
                      )}
                      {spot.parkingAvailable ? (
                        <CircleParking className="h-6 w-6 text-primary" />
                      ) : (
                        <CircleParkingOff className="h-6 w-6 text-primary" />
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="images" className="grid grid-cols-2 gap-4">
                {spot.imageUrls.map((imageUrl, index) => (
                  <Image
                    key={index}
                    src={imageUrl}
                    alt={`${spot.name} - Image ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-[200px] object-cover rounded-lg"
                  />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default Spot;
