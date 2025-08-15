import React from 'react';
import { getVendorStats, getServerTime } from '../actions';

export default async function VendorStats(): Promise<React.JSX.Element> {
  // Server-side data fetching - this runs on the server
  const stats = await getVendorStats();
  const serverTime = await getServerTime();

  return (
    <div className='vendor-stats'>
      <h2>Platform Statistics</h2>
      <p className='stats-subtitle'>
        Real-time data from our growing community
      </p>

      <div className='stats-grid'>
        <div className='stat-card'>
          <div className='stat-number'>
            {stats.totalVendors.toLocaleString()}
          </div>
          <div className='stat-label'>Active Vendors</div>
        </div>

        <div className='stat-card'>
          <div className='stat-number'>
            ${(stats.totalSales / 1000000).toFixed(1)}M
          </div>
          <div className='stat-label'>Total Sales</div>
        </div>

        <div className='stat-card'>
          <div className='stat-number'>
            {stats.activeUsers.toLocaleString()}
          </div>
          <div className='stat-label'>Daily Active Users</div>
        </div>
      </div>

      <div className='server-info'>
        <p>Last updated: {serverTime} (Mexico City time)</p>
        <small>Data is server-side rendered for optimal performance</small>
      </div>
    </div>
  );
}
