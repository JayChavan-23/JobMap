# JobMap

A React-based web application for tracking job applications across South Australian councils. Features an interactive map with council boundaries and a synchronized list view for managing application statuses.

## How it works?

The application loads SA council boundary data from a GeoJSON file and renders it on an interactive Leaflet map. Each council can be assigned a status (None, Applied, Response, Rejected, Offer) which determines its color on the map. The data is stored locally in the browser's localStorage and persists across sessions.

- **GeoJSON Data**: Council boundaries loaded from `/public/councils.geojson`
- **Interactive Map**: Leaflet-based map showing council polygons
- **Status Management**: Color-coded councils based on application status
- **Local Storage**: Application data persisted in browser storage

## Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Mapping**: Leaflet + React-Leaflet
- **State Management**: React Query + Custom hooks
- **Data Persistence**: Browser localStorage
- **Date Handling**: date-fns
- **Data Validation**: Zod

## How to run


### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd JobMap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```