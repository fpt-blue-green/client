'use client';
import { Button } from '@/components/ui/button';
import { fetchRequest } from '@/request';

const SettingCards = () => {
  const { data, isLoading } = fetchRequest.settings();

  return (
    <div className="flex flex-col gap-4 my-8">
      {!isLoading && data ? (
        data.map((item, index) => (
          <div key={index} className="flex justify-between items-center shadow-md border p-6">
            <div>
              <h5 className="text-blue-400 mb-2">{item.keyName}</h5>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
            <Button variant="outline" size="large" className="text-muted-foreground">
              Cấu hình
            </Button>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default SettingCards;
