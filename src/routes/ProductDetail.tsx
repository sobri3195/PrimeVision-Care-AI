import { useParams, Link } from 'react-router-dom';
import TopBar from '@/components/layout/TopBar'; import Card from '@/components/shared/Card'; import Button from '@/components/shared/Button';
import { mockProducts } from '@/data/mockProducts'; import { currency, loadLS, saveLS } from '@/lib/utils';

export default function ProductDetail(){
 const { id } = useParams(); const p = mockProducts.find((x)=>x.id===id) || mockProducts[0];
 const add=()=>{const cart=loadLS<string[]>('cart',[]); saveLS('cart', [...cart,p.id]);};
 return <div className="space-y-4 px-4"><TopBar title="Detail Produk"/><Card><p className="font-semibold">{p.name}</p><p>{currency(p.discountPrice)}</p><p className="text-sm">{p.description}</p><Button className="mt-3 w-full" onClick={add}>Tambah ke Cart</Button><Link to="/cart"><Button className="mt-2 w-full bg-primeGold text-primeNavy">Lihat Cart</Button></Link></Card></div>
}
