import AvatarUploader from '@/components/avatar-uploader';
import Paper from '@/components/custom/paper';

const General = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Paper>
        <div className="flex flex-col items-center justify-center gap-6">
          <AvatarUploader />
          <p className="text-xs text-muted-foreground text-center">
            Được phép *.jpeg, *.jpg, *.png, *.gif
            <br />
            kích thước tối đa 3 Mb
          </p>
        </div>
      </Paper>
      <Paper className="col-span-2">
        <div></div>
      </Paper>
    </div>
  );
};
export default General;
