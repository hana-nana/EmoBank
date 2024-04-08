import { ResponsivePie } from '@nivo/pie'

const data = [
    {
      "id": "공포",
      "value": 135,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "놀람",
      "value": 164,
      "color": "hsl(274, 70%, 50%)"
    },
    {
      "id": "화남",
      "value": 157,
      "color": "hsl(179, 70%, 50%)"
    },
    {
      "id": "슬픔",
      "value": 429,
      "color": "hsl(47, 70%, 50%)"
    },
    {
      "id": "중립",
      "value": 45,
      "color": "hsl(160, 70%, 50%)"
    },
    {
        "id": "행복",
        "value": 45,
        "color": "hsl(160, 70%, 50%)"
    },
    {
      "id": "혐오",
      "value": 1,
      "color": "hsl(160, 70%, 50%)"
    }
  ]
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsivePie = ({ data /* see data tab */ }) => (
    <ResponsivePie
        data={data}
        margin={{ top: 10, right: 80, bottom: 40, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={10}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: false
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 10,
                translateY: 30,
                itemsSpacing: -50,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 10,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
        animate={false}
    />
)

export {MyResponsivePie}