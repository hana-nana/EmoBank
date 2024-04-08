import { ResponsiveTimeRange } from '@nivo/calendar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveTimeRange = ({ data /* see data tab */ }) => (
    <ResponsiveTimeRange
        data={data.data}
        from={data.from}
        to={data.to}
        emptyColor="#eeeeee"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        margin={{ top: 40, right: 0, bottom: 0, left: 0 }}
        weekdayTicks={[]}
        dayBorderWidth={1}
        weekdayLegendOffset={1}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: true,
                itemCount: 8,
                itemWidth: 42,
                itemHeight: 0,
                itemsSpacing: 14,
                itemDirection: 'right-to-left',
                translateX: 0,
                translateY: -70,
                symbolSize: 20
            }
        ]}
    />
)

export {MyResponsiveTimeRange}