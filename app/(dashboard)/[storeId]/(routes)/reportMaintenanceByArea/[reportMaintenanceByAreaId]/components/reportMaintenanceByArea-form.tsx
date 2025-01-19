"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { ReportMaintenanceByArea } from "@prisma/client";
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
    bmkg: z.coerce.number(),
    airNav: z.coerce.number(),
    pla: z.coerce.number(),
    ptBib: z.coerce.number(),
});

type ReportMaintenanceByAreaFormValues = z.infer<typeof formSchema>;

interface ReportMaintenanceByAreaFormProps {
    initialData: ReportMaintenanceByArea | null;
}

export const ReportMaintenanceByAreaForm: React.FC<ReportMaintenanceByAreaFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Report Maintenance By Area" : "Create Report Maintenance By Area";
    const description = initialData ? "Edit a Report Maintenance By Area" : "Add a new Report Maintenance By Area";
    const toastMessage = initialData ? "Report Maintenance By Area updated." : "Report Maintenance By Area created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<ReportMaintenanceByAreaFormValues>({
                resolver: zodResolver(formSchema),
                defaultValues: initialData ? {
                    ...initialData,
                    bmkg: parseFloat(String(initialData?.bmkg)),
                    airNav: parseFloat(String(initialData?.airNav)),
                    pla: parseFloat(String(initialData?.pla)),
                    ptBib: parseFloat(String(initialData?.ptBib)),
                } : {
                    bmkg: 0,
                    airNav: 0,
                    pla: 0,
                    ptBib: 0
                }
            });

    const onSubmit = async (data: ReportMaintenanceByAreaFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/reportMaintenanceByArea/${params.reportMaintenanceByAreaId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/reportMaintenanceByArea`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/reportMaintenanceByArea`);
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
                            name="bmkg"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>BMKG</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="9. 99" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="airNav"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Air Nav</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="9. 99" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="pla"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>PLA</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="9. 99" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="ptBib"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>PT BIB</FormLabel>
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

