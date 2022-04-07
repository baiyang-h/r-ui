import RTable1 from './table1'
import RTable2 from './table2'
import RTable3 from './table3'
import RTable4 from './table4'

function Gap() {
    return <div style={{ height: '50px' }}></div>
}

export default function Table() {
    return <div>
        <RTable1 />
        <Gap />
        <RTable2 />
        <Gap />
        <RTable3 />
        <Gap />
        <RTable4 />
    </div>
}