import { useState } from 'react';
import TopBar from '@/components/layout/TopBar'; import Card from '@/components/shared/Card'; import Button from '@/components/shared/Button';
import { BRANCHES, SERVICES } from '@/lib/constants';

export default function Booking(){
  const [step, setStep] = useState(1);
  const [complaint, setComplaint] = useState('Mata lelah');
  const [branch, setBranch] = useState(BRANCHES[0]);
  const [service, setService] = useState(SERVICES[0]);
  return <div className="space-y-4 px-4"><TopBar title="Booking"/><Card><p className="font-semibold">Alur booking langkah {step}/7</p><input className="mt-2 w-full rounded-xl border p-2" value={complaint} onChange={(e)=>setComplaint(e.target.value)} /><select className="mt-2 w-full rounded-xl border p-2" value={branch} onChange={(e)=>setBranch(e.target.value)}>{BRANCHES.map((b)=><option key={b}>{b}</option>)}</select><select className="mt-2 w-full rounded-xl border p-2" value={service} onChange={(e)=>setService(e.target.value)}>{SERVICES.map((s)=><option key={s}>{s}</option>)}</select><Button className="mt-3 w-full" onClick={()=>setStep((s)=>Math.min(7,s+1))}>Lanjut</Button>{step===7 && <><Button className="mt-2 w-full bg-emerald-600">Lanjutkan via WhatsApp</Button><p className="mt-2 text-xs">QR check-in dummy: PV-BOOK-2026</p></>}</Card></div>
}
