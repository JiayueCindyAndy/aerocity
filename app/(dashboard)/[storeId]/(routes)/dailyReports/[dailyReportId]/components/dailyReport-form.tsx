"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { DailyReport } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage
} from "@/components/ui/form";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
    idCater: z.string().min(1),
    nama: z.string().min(1),
    standAkhir: z.coerce.number().min(1),
    pemakaian: z.coerce.number().min(1),
    ketinggianAir: z.coerce.number().min(1),
    layanan: z.coerce.number().min(1),
    pembayaranAir: z.coerce.number().min(1),
    imageUrl: z.string().min(1)
});

type DailyReportFormValues = z.infer<typeof formSchema>;

interface DailyReportFormProps {
    initialData: DailyReport | null;
}

export const DailyReportForm: React.FC<DailyReportFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Daily Report" : "Create Daily Report";
    const description = initialData ? "Edit a Daily Report" : "Add a new Daily Report";
    const toastMessage = initialData ? "Daily Report updated." : "Daily Report created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<DailyReportFormValues>({
            resolver: zodResolver(formSchema),
            defaultValues: initialData ? {
                ...initialData,
                pemakaian: parseFloat(String(initialData?.pemakaian)),
                standAkhir: parseFloat(String(initialData?.standAkhir)),
                ketinggianAir: parseFloat(String(initialData?.ketinggianAir)),
                layanan: parseFloat(String(initialData?.layanan)),
                pembayaranAir: parseFloat(String(initialData?.pembayaranAir)),

            } : {
                idCater: '',
                nama: '',
                standAkhir: 0,
                pemakaian: 0,
                ketinggianAir: 0,
                layanan: 0,
                pembayaranAir: 0,
                imageUrl: ''
            }
        });

    const onSubmit = async (data: DailyReportFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/dailyReports/${params.dailyReportId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/dailyReports`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/dailyReports`);
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/dailyReports/${params.dailyReportId}`);
            router.refresh();
            router.push(`/${params.storeId}/dailyReports`);
            toast.success("Daily Report deleted");
        } catch (error) {
            toast.error("Make sure you removed all categories using this daily Report first.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal 
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="icon"
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" />
                </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    
                    <FormField 
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Foto</FormLabel>
                                <FormControl>
                                    <ImageUpload 
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            control={form.control}
                            name="idCater"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Id Cater</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Id Cater" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="nama"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="name" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="standAkhir"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stand Akhir</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="9. 99" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="pemakaian"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pemakaian</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="9. 99" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="ketinggianAir"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ketinggian Air</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="9. 99" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="pembayaranAir"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pembayaran Air</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Pembayaran Air" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="layanan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Layanan</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="9. 99" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
            
        </>
    );
};

