import Table from '@/components/custom/data-table';
import { columns } from './columns';
import { ButtonProps } from '@/components/ui/button';
import ITag from '@/types/tag';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import PopupForm from './popup-form';
import { Mode } from '@/types/enum';

const TagTable = () => {
  const handleOnCheck = (item: ITag[]) => {};
  const columnsWithActions = [
    ...columns,
    {
      id: 'actions',
      cell: ({ row }) => {
        const tag = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <PopupForm mode={Mode.Edit} tag={tag} />
              <PopupForm mode={Mode.Delete} tag={tag} />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const buttons: ButtonProps[] = [
    {
      children: 'Thêm',
    },
  ];
  return (
    <Table
      onCheck={(item) => {
        handleOnCheck(item);
      }}
      columns={columnsWithActions}
      url="/Tags/filter"
      buttons={buttons}
    />
  );
};

export default TagTable;
