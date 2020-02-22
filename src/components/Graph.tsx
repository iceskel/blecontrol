import React from 'react';
import { VictoryAxis, VictoryTheme, VictoryScatter, VictoryChart } from 'victory';

type Domain = [number, number];

interface Props {
    x?: number;
    y?: number;
}

function Graph(props: Props) {
    const { x = 0, y = 0 } = props;

    const style = {
        parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" }
    };

    const domain = [-5, 5] as Domain;


    return (
        <VictoryChart
            theme={VictoryTheme.material}
            width={500}
            height={400}
            domain={domain}
            style={style}
            animate={{ duration: 2000 }}
        >
            <VictoryScatter 
                data={[{ x, y }]}
                style={{ data: { fill: "tomato" }}}
                size={7}
                animate={{
                    onExit: {
                        duration: 500,
                        before: () => ({ opacity: 0.3, _y: 0 })
                    },
                    onEnter: {
                        duration: 500,
                        before: () => ({ opacity: 0.3, _y: 0 }),
                        after: (datum) => ({ opacity: 1, _y: datum._y })
                    }
                }}
            />

        </VictoryChart>
    );
}

export default Graph