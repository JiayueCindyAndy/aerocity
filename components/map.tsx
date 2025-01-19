'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Inisialisasi peta Leaflet
    const map = L.map(mapRef.current).setView([51.505, -0.09], 13);

    // Tambahkan layer Tile
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Tambahkan marker
    const markers = [
      { position: [51.505, -0.09], popup: 'Marker 1' },
      { position: [51.51, -0.1], popup: 'Marker 2' },
      { position: [51.52, -0.12], popup: 'Marker 3' },
    ];

    markers.forEach((marker) => {
      L.marker(marker.position as [number, number]).addTo(map).bindPopup(marker.popup);
    });

    // Tambahkan polyline
    const paths: [number, number][] = [
      [51.505, -0.09],
      [51.51, -0.1],
      [51.52, -0.12],
    ];
    L.polyline(paths, { color: 'blue' }).addTo(map);

    return () => {
      map.remove(); // Hapus peta saat komponen unmount
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="h-[300px] w-full rounded-md overflow-hidden"
      style={{ height: '300px', width: '100%' }}
    ></div>
  );
}


