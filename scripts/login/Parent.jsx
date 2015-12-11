import Child from './Child.jsx';

var Parent = React.createClass({
    render: function(){
        return (
            <div>
                <div> Hello World </div>
                <Child/>
            </div>
        )
    }
});

export default Parent;