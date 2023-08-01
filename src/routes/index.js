import { useRoutes } from 'react-router-dom';
import AuctionsPage from '../pages/AuctionsPage';
import Dashboard from '../pages/Dashboard';
import BidPlacements from '../pages/BidPlacements';
import MembersList from '../pages/membersList';
import Auctiondetails from '../pages/AuctionDetails';

export default function Router() {
  return useRoutes([
    {
      path: '*',
      element: <Dashboard />
      // children: [{ path: 'members', element: <MembersList replace /> }]
    },
    { path: '/members', element: <MembersList /> },
    {
      path: '/auctions',
      element: <AuctionsPage />
    },
    {
      path: '/bidplacements',
      element: <BidPlacements />
    },
    {
      path: '/auctiondetails',
      element: <Auctiondetails />
    }
  ]);
}
