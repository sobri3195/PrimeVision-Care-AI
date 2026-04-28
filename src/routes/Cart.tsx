import TopBar from '@/components/layout/TopBar'; import Card from '@/components/shared/Card'; import CheckoutSummary from '@/components/marketplace/CheckoutSummary'; import Button from '@/components/shared/Button';
import { loadLS, saveLS } from '@/lib/utils';

export default function Cart(){const cart=loadLS<string[]>('cart',[]); const total=cart.length*125000; const checkout=()=>saveLS('cart',[]);
return <div className="space-y-4 px-4"><TopBar title="Cart"/><Card><p>{cart.length} item di cart</p><p className="text-xs">Checkout ini hanya simulasi prototype.</p></Card><CheckoutSummary total={total} /><Button className="w-full" onClick={checkout}>Checkout Dummy</Button></div>}
