'use client'

import React, { useState, useEffect } from 'react';

import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHeader,
  TableHead
} from '@/components/ui/table';

import { Input } from '@/components/ui/input';

import { Checkbox } from '@/components/ui/checkbox';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem
} from '@/components/ui/select';

import { PencilIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

interface RowData {
  name: string;
  type: string;
  key: boolean;
  label: boolean;
  formula: string;
  show: boolean;
  editable: boolean;
  require: boolean;
  initialValue: string;
}

const Page = () => {
  const [data, setData] = useState<RowData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempData, setTempData] = useState<RowData | null>(null);

  // Load data from localStorage if available
  useEffect(() => {
    const savedData = localStorage.getItem('pelanggan');
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      setData([
        {
          name: "_RowNumber",
          type: "Number",
          key: false,
          label: false,
          formula: "=",
          show: true,
          editable: false,
          require: false,
          initialValue: ""
        },
        {
          name: "ID PELANGGAN",
          type: "Ref",
          key: false,
          label: false,
          formula: "=",
          show: true,
          editable: true,
          require: false,
          initialValue: ""
        },
        {
          name: "NAMA",
          type: "Text",
          key: false,
          label: true,
          formula: "=",
          show: true,
          editable: true,
          require: false,
          initialValue: ""
        },
        {
          name: "STAND AKHIR",
          type: "Decimal",
          key: false,
          label: false,
          formula: "= MAX(SELECT(CATAT METER))",
          show: true,
          editable: true,
          require: false,
          initialValue: ""
        },
        {
          name: "Related CATAT METERs",
          type: "List",
          key: false,
          label: false,
          formula: "= REF_ROWS(*CATAT METER)",
          show: true,
          editable: false,
          require: false,
          initialValue: ""
        },
      ]);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem('pelanggan', JSON.stringify(data));
    }
  }, [data]);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setTempData({ ...data[index] });
  };

  const handleSave = () => {
    if (editingIndex !== null && tempData) {
      const newData = [...data];
      newData[editingIndex] = tempData;
      setData(newData);
      setEditingIndex(null);
      setTempData(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setTempData(null);
  };

  const handleChange = (key: keyof RowData, value: any) => {
    if (tempData) {
      setTempData({
        ...tempData,
        [key]: value
      });
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className="text-2xl font-bold mb-4">Catat Meter</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2}>Name</TableHead> {/* Merged header for Name, Number, and Pencil */}
            <TableHead>Type</TableHead>
            <TableHead>Key?</TableHead>
            <TableHead>Label?</TableHead>
            <TableHead>Formula</TableHead>
            <TableHead>Show?</TableHead>
            <TableHead>Editable?</TableHead>
            <TableHead>Require?</TableHead>
            <TableHead>Initial Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {/* Column 1: No (Index) */}
              <TableCell>{index + 1}</TableCell>

              {/* Column 2: Pencil Icon + Name */}
              <TableCell className="flex items-center space-x-2">
                <PencilIcon
                  className="h-5 w-5 text-blue-500 cursor-pointer"
                  onClick={() => handleEdit(index)}
                />
                <Input
                  value={editingIndex === index ? tempData?.name : row.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={editingIndex !== index}
                  className="w-32"
                />
              </TableCell>

              {/* Other columns */}
              <TableCell>
                <Select
                  value={editingIndex === index ? tempData?.type : row.type}
                  onValueChange={(value) => handleChange('type', value)}
                  disabled={editingIndex !== index}
                >
                  <SelectTrigger>{editingIndex === index ? tempData?.type : row.type}</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Number">Number</SelectItem>
                    <SelectItem value="Text">Text</SelectItem>
                    <SelectItem value="Ref">Ref</SelectItem>
                    <SelectItem value="Decimal">Decimal</SelectItem>
                    <SelectItem value="DateTime">DateTime</SelectItem>
                    <SelectItem value="Image">Image</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell>
                <Checkbox
                  checked={editingIndex === index ? tempData?.key : row.key}
                  onCheckedChange={(checked) => handleChange('key', checked)}
                  disabled={editingIndex !== index}
                />
              </TableCell>

              <TableCell>
                <Checkbox
                  checked={editingIndex === index ? tempData?.label : row.label}
                  onCheckedChange={(checked) => handleChange('label', checked)}
                  disabled={editingIndex !== index}
                />
              </TableCell>

              <TableCell>
                <Input
                  value={editingIndex === index ? tempData?.formula : row.formula}
                  onChange={(e) => handleChange('formula', e.target.value)}
                  disabled={editingIndex !== index}
                />
              </TableCell>

              <TableCell>
                <Checkbox
                  checked={editingIndex === index ? tempData?.show : row.show}
                  onCheckedChange={(checked) => handleChange('show', checked)}
                  disabled={editingIndex !== index}
                />
              </TableCell>

              <TableCell>
                <Checkbox
                  checked={editingIndex === index ? tempData?.editable : row.editable}
                  onCheckedChange={(checked) => handleChange('editable', checked)}
                  disabled={editingIndex !== index}
                />
              </TableCell>

              <TableCell>
                <Checkbox
                  checked={editingIndex === index ? tempData?.require : row.require}
                  onCheckedChange={(checked) => handleChange('require', checked)}
                  disabled={editingIndex !== index}
                />
              </TableCell>

              <TableCell>
                <Input
                  value={editingIndex === index ? tempData?.initialValue : row.initialValue}
                  onChange={(e) => handleChange('initialValue', e.target.value)}
                  disabled={editingIndex !== index}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Action Buttons (Save / Cancel) - Always visible */}
      <div className="flex justify-end space-x-2 mt-4">
        <Button onClick={handleSave} variant="default" className="text-white">
          Save
        </Button>
        <Button onClick={handleCancel} variant="outline" className="text-black">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Page;
