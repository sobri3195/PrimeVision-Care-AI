import Card from '@/components/shared/Card';
import { DISCLAIMER_LINES } from '@/lib/constants';

export default function DisclaimerBanner() {
  return (
    <Card className="border border-amber-200 bg-amber-50">
      {DISCLAIMER_LINES.map((line) => (
        <p key={line} className="text-xs text-amber-900">• {line}</p>
      ))}
    </Card>
  );
}
