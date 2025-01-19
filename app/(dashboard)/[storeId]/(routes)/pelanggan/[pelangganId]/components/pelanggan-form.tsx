"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Pelanggan } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { AlertModal } from "@/components/modals/alert-modal";

const formSchema = z.object({
    name: z.string().min(1),
    type: z.string().min(1),
    key: z.boolean(),
    label: z.boolean(),
    formula: z.string(),
    show: z.boolean(),
    editable: z.boolean(),
    require: z.boolean(),
    initialValue: z.string(),
});

type PelangganFormValues = z.infer<typeof formSchema>;

interface PelangganFormProps {
    initialData: Pelanggan | null;
}

export const PelangganForm: React.FC<PelangganFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Pelanggan" : "Create Pelanggan";
    const description = initialData ? "Edit Pelanggan" : "Tambahkan data pelanggan baru";
    const toastMessage = initialData ? "Pelanggan updated." : "Pelanggan created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<PelangganFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            type: '',
            key: false,
            label: false,
            formula: '',
            show: false,
            editable: false,
            require: false,
            initialValue: '',
        }
    });

    const onSubmit = async (data: PelangganFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/pelanggan/${params.pelangganId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/pelanggan`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/pelanggan`);
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
            await axios.delete(`/api/${params.storeId}/pelanggan/${params.pelangganId}`);
            router.refresh();
            router.push(`/${params.storeId}/pelanggan`);
            toast.success("Pelanggan deleted");
        } catch (error) {
            toast.error("Make sure you removed all products using this size first.");
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NAME</TableHead>
            <TableHead>TYPE</TableHead>
            <TableHead>KEY</TableHead>
            <TableHead>LABEL</TableHead>
            <TableHead>FORMULA</TableHead>
            <TableHead>SHOW</TableHead>
            <TableHead>EDITABLE</TableHead>
            <TableHead>REQUIRE</TableHead>
            <TableHead>INITIAL VALUE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Input disabled={loading} placeholder="name" {...form.register("name")} />
            </TableCell>
            <TableCell>
              <Select disabled={loading} onValueChange={(value) => form.setValue("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="decimal">Decimal</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Checkbox checked={!!form.watch("key")} onCheckedChange={(checked) => form.setValue("key", !!checked)} disabled={loading} />
            </TableCell>
            <TableCell>
              <Checkbox checked={!!form.watch("label")} onCheckedChange={(checked) => form.setValue("label", !!checked)} disabled={loading} />
            </TableCell>
            <TableCell>
              <Input disabled={loading} placeholder="=" {...form.register("formula")} />
            </TableCell>
            <TableCell>
              <Checkbox checked={!!form.watch("show")} onCheckedChange={(checked) => form.setValue("show", !!checked)} disabled={loading} />
            </TableCell>
            <TableCell>
              <Checkbox checked={!!form.watch("editable")} onCheckedChange={(checked) => form.setValue("editable", !!checked)} disabled={loading} />
            </TableCell>
            <TableCell>
              <Checkbox checked={!!form.watch("require")} onCheckedChange={(checked) => form.setValue("require", !!checked)} disabled={loading} />
            </TableCell>
            <TableCell>
              <Input disabled={loading} placeholder="name" {...form.register("initialValue")} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button disabled={loading} className="ml-auto" type="submit">
        {action}
      </Button>
    </form>
            </Form>
            
        </>
    );
};