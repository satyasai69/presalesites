import { Button } from "@/components/ui/button"

export function CustomButton({ name }: { name: string }) {
    return <Button className="w-full bg-[#22c55e] text-white">{name}</Button>
}
