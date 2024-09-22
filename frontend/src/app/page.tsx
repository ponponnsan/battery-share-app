"use client";
import ChooseDriverList from '@/components/ChooseDriverList/choose-driver-list';
import CommuteCargoDriverRegistration from '@/components/CommuteCargoDriverRegistration/commute-cargo-full-driver-registration';
import CommuteCargoLogin from '@/components/CommuteCargoLogin/commute-cargo-login';
import CommuteCargoSignup from '@/components/CommuteCargoSignup/commute-cargo-signup';
import CommuteForm from '@/components/CommutingRouteForm/commuting-route-form';
import DriverDetailsView from '@/components/DriverDetailsView/driver-details-view';
import FindDriverForm from '@/components/FindDriverForm/find-driver-form';
import TrunkShareMapView from '@/components/TrunkShareMapView/trunk-share-map-view';
import DriverRating from '@/components/DriverRating/driver-rating';
import UserRating from '@/components/UserRating/user-rating';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* ログイン画面 */}
        <Route path="/" element={<CommuteCargoLogin />} />
        
        {/* サインアップ画面 */}
        <Route path="/signup" element={<CommuteCargoSignup />} />
        
        {/* ドライバー登録画面 */}
        <Route path="/driver-registration" element={<CommuteCargoDriverRegistration />} />
        
        {/* 通勤ルート登録画面 */}
        <Route path="/commuting-route" element={<CommuteForm />} />
        
        {/* ドライバー選択画面 */}
        <Route path="/choose-driver" element={<ChooseDriverList />} />
        
        {/* ドライバー詳細画面 */}
        <Route path="/driver-details" element={<DriverDetailsView />} />
        
        {/* ドライバー検索画面 */}
        <Route path="/find-driver" element={<FindDriverForm />} />
        
        {/* マップ表示画面 */}
        <Route path="/map-view" element={<TrunkShareMapView />} />

        {/* ドライバー評価画面 */}
        <Route path="/driver-rating" element={<DriverRating />} />

        {/* ユーザー評価画面 */}
        <Route path="/user-rating" element={<UserRating />} />
      </Routes>
    </Router>
  );
}

export default App;
