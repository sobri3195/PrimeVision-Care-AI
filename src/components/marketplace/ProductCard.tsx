import { Link } from 'react-router-dom';
import Card from '@/components/shared/Card';
import type { Product } from '@/types/product';
import { currency } from '@/lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  return <Link to={`/marketplace/${product.id}`}><Card><p className="font-semibold">{product.name}</p><p className="text-xs">{product.category}</p><p className="text-sm text-primeNavy font-bold">{currency(product.discountPrice)}</p></Card></Link>;
}
