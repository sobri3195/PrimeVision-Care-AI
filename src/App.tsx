import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import Home from '@/routes/Home';
import AICheck from '@/routes/AICheck';
import EyeRiskResult from '@/routes/EyeRiskResult';
import Education from '@/routes/Education';
import EducationDetail from '@/routes/EducationDetail';
import Marketplace from '@/routes/Marketplace';
import ProductDetail from '@/routes/ProductDetail';
import Cart from '@/routes/Cart';
import Profile from '@/routes/Profile';
import FamilyPassport from '@/routes/FamilyPassport';
import Voucher from '@/routes/Voucher';
import Gamification from '@/routes/Gamification';
import Booking from '@/routes/Booking';
import PostOpCheck from '@/routes/PostOpCheck';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-check" element={<AICheck />} />
        <Route path="/ai-check/result" element={<EyeRiskResult />} />
        <Route path="/education" element={<Education />} />
        <Route path="/education/:id" element={<EducationDetail />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/family-passport" element={<FamilyPassport />} />
        <Route path="/voucher" element={<Voucher />} />
        <Route path="/gamification" element={<Gamification />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/post-op-check" element={<PostOpCheck />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppLayout>
  );
}
