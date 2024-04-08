import { ResponsiveLine } from '@nivo/line'

const data = 
[
    {
        "id": "user",
        "color": "hsl(212, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 102
            },
            {
                "x": "helicopter",
                "y": 209
            },
            {
                "x": "boat",
                "y": 54
            },
            {
                "x": "train",
                "y": 77
            },
            {
                "x": "subway",
                "y": 89
            },
            {
                "x": "bus",
                "y": 298
            },
            {
                "x": "car",
                "y": 212
            },
            {
                "x": "moto",
                "y": 258
            },
            {
                "x": "bicycle",
                "y": 96
            },
            {
                "x": "horse",
                "y": 234
            },
            {
                "x": "skateboard",
                "y": 88
            },
            {
                "x": "others",
                "y": 43
            }
        ]
    }
]

const MyResponsiveLine = ({data}) => (

    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: '날짜',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '금액(만)',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        
    />
)

export {MyResponsiveLine}