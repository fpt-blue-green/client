import { FaBox, FaGlobe, FaPeopleGroup, FaSackDollar } from 'react-icons/fa6';
import Card from './components/card-overview';
import { FluctuationType, NumberType } from '@/types/enum';
import { FaProjectDiagram } from 'react-icons/fa';
import OverviewChart from './components/chart';
import CardCampaign from './components/card-campaign';
import Paper from '@/components/custom/paper';

// Mock
const overviewCardDetails = {
  quantity: 1000000,
  fluctuationValue: 20,
  fluctuationType: FluctuationType.ASC,
};

const campaignCardDetails = {
  imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiU10iYCU6v7GfydlzEq30Ctqj85cZr-C4bg&s',
  title: 'MPA Project',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam earum quo culpa, quas sed est cumque sit esse reprehenderit quasi repellat fugit cupiditate consequuntur distinctio voluptatem consectetur porro tenetur odit!',
  budget: 500000,
};
// Mock data

const Overview = () => {
  return (
    <div className="container">
      <h1 className="text-xl font-bold">Phân Tích Số Liệu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <Card
          cardType={NumberType.Currency}
          title="Doanh Thu"
          icon={<FaSackDollar className="text-muted-foreground" />}
          details={overviewCardDetails}
        />

        <Card
          cardType={NumberType.Quantity}
          title="Nhãn Hàng"
          icon={<FaGlobe className="text-muted-foreground" />}
          details={overviewCardDetails}
        />
        <Card
          cardType={NumberType.Quantity}
          title="Nhà Sáng Tạo"
          icon={<FaPeopleGroup className="text-muted-foreground" />}
          details={overviewCardDetails}
        />
        <Card
          cardType={NumberType.Quantity}
          title="Chiến Dịch"
          icon={<FaProjectDiagram className="text-muted-foreground" />}
          details={overviewCardDetails}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-11 mt-4 gap-4">
        <Paper className="md:col-span-6">
          <OverviewChart />
        </Paper>
        <Paper className="md:col-span-5">
          <h3 className="font-semibold">Chiến dịch gần đây</h3>
          <p className="text-muted-foreground text-sm">Khoảng 110 chiến dịch tháng này.</p>
          <div className="mt-8 flex flex-col gap-8">
            <CardCampaign details={campaignCardDetails} />
            <CardCampaign details={campaignCardDetails} />
            <CardCampaign details={campaignCardDetails} />
            <CardCampaign details={campaignCardDetails} />
            <CardCampaign details={campaignCardDetails} />
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Overview;
