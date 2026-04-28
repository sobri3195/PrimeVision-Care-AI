import TopBar from '@/components/layout/TopBar'; import { mockVouchers } from '@/data/mockVouchers'; import VoucherCard from '@/components/profile/VoucherCard';
export default function Voucher(){return <div className="space-y-4 px-4"><TopBar title="Voucher"/>{mockVouchers.slice(0,10).map((v)=><VoucherCard key={v.id} text={`${v.title} - ${v.code}`} />)}</div>}
