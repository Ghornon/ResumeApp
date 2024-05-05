import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const Poster = ({
    variant,
    title,
    posterUrl,
}: {
    variant: string;
    title: string;
    posterUrl: string;
}) => {
    return (
        <Card sx={{ width: 210 }} variant={variant == 'outlined' ? 'outlined' : 'elevation'}>
            <CardMedia sx={{ width: 210, height: 297 }} image={posterUrl} title={title} />
        </Card>
    );
};

export default Poster;
