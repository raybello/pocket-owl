export function PageHeader({
  heading,
  text,
}: {
  heading: string;
  text?: string;
}) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
      {text && <p className="text-muted-foreground">{text}</p>}
    </div>
  );
}
