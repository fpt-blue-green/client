import { Button } from '@/components/ui/button';

const Categories = () => {
  return (
    <div className="container my-20">
      <h3 className="font-semibold text-2xl mb-4">Những Danh Mục Liên Quan</h3>
      <div className="flex flex-wrap gap-4">
        <Button className="border-2 bg-emerald-100 text-muted-foreground" variant={'link'}>
          Demo related category
        </Button>
        <Button className="border-2 bg-emerald-100 text-muted-foreground" variant={'link'}>
          Demo related category
        </Button>
        <Button className="border-2 bg-emerald-100 text-muted-foreground" variant={'link'}>
          Demo related category
        </Button>
        <Button className="border-2 bg-emerald-100 text-muted-foreground" variant={'link'}>
          Demo related category
        </Button>
        <Button className="border-2 bg-emerald-100 text-muted-foreground" variant={'link'}>
          Demo related category
        </Button>
        <Button className="border-2 bg-emerald-100 text-muted-foreground" variant={'link'}>
          Demo related category
        </Button>
        <Button className="border-2 bg-emerald-100 text-muted-foreground" variant={'link'}>
          Demo related category
        </Button>
      </div>
    </div>
  );
};

export default Categories;
