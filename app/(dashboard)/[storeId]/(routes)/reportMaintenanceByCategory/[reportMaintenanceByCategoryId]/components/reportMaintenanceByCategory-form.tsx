"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { ReportMaintenanceByCategory } from "@prisma/client";
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
    inspeksi: z.coerce.number(),
    kalibrasi: z.coerce.number(),
    pembersihan: z.coerce.number(),
    penggantian: z.coerce.number(),
});

type ReportMaintenanceByCategoryFormValues = z.infer<typeof formSchema>;

interface ReportMaintenanceByCategoryFormProps {
    initialData: ReportMaintenanceByCategory | null;
}

export const ReportMaintenanceByCategoryForm: React.FC<ReportMaintenanceByCategoryFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Report Maintenance By Category" : "Create Report Maintenance By Category";
    const description = initialData ? "Edit a Report Maintenance By Category" : "Add a new Report Maintenance By Category";
    const toastMessage = initialData ? "Report Maintenance By Category updated." : "Report Maintenance By Category created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<ReportMaintenanceByCategoryFormValues>({
                resolver: zodResolver(formSchema),
                defaultValues: initialData ? {
                    ...initialData,
                    inspeksi: parseFloat(String(initialData?.inspeksi)),
                    kalibrasi: parseFloat(String(initialData?.kalibrasi)),
                    pembersihan: parseFloat(String(initialData?.pembersihan)),
                    penggantian: parseFloat(String(initialData?.penggantian)),
                } : {
                    inspeksi: 0,
                    kalibrasi: 0,
                    pembersihan: 0,
                    penggantian: 0
                }
            });

    const onSubmit = async (data: ReportMaintenanceByCategoryFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/reportMaintenanceByCategory/${params.reportMaintenanceByCategoryId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/reportMaintenanceByCategory`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/reportMaintenanceByCategory`);
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
            await axios.delete(`/api/${params.storeId}/reportMaintenanceByArea/${params.reportMaintenanceByAreaId}`);
            router.refresh();
            router.push(`/${params.storeId}/reportMaintenanceByArea`);
            toast.success("Report Maintenance By Area deleted");
        } catch (error) {
            toast.error("Make sure you removed all products using this Report Maintenance By Area first.");
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
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            control={form.control}
                            name="inspeksi"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Inspeksi</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="9. 99" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="kalibrasi"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kalibrasi</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="9. 99" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="pembersihan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pembersihan</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="9. 99" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="penggantian"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Penggantian</FormLabel>
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

