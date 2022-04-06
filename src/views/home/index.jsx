import { TimePicker } from 'antd';
import moment from 'moment';

export default function Home() {

    function onChange(time, timeString) {
        console.log(time, timeString);
    }

    return <div>
        <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
    </div>
}