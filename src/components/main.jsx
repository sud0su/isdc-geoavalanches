import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import '../css/avalanches.css'

const styles = {
	wrapper: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	label:{
		textTransform: 'capitalize',
		color: 'rgba(0, 0, 0, 0.54)',
		fontSize: 13,
		padding: 0
	}
}

let PolygonArea = '';
class IsdcAvalanches extends React.Component {
    constructor(props){
        super(props);
        this.state = {
			results: []
		}
    }

	componentDidMount() {
		this.handleOpen;
	}
	
    handleOpen = () => {
		const catStatistic = document.querySelector('input[name=filter]:checked').value;
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const day = now.getDate();
		
		const fullDate = year+'-'+month+'-'+day;
		this.setState({ dialogOpen: true });
		this.setState({ isLoading: true });
		// console.log(this.props.urlAvalanches);
		fetch(this.props.urlAvalanches, {
			method: "POST",
			dataType: "JSON",
			headers: {
				'Accept': 'application/json',
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify({
				spatialfilter: [PolygonArea],
				code: '',
				date: fullDate,
				flag: catStatistic,
				rf_type: 'GFMS + GLOFAS'
			})
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Something wrong ...');
				}
			})
			.then(data => this.setState({ results: [data.panels_list], isLoading: false }))
			// .then(function(data){console.log(data.panels);})
			.catch(error => this.setState({ error, isLoading: false }));
	}

    render(){
        return(
            <div style={styles.wrapper}>
                <div className={"IconBox"}>
					<FlatButton
					label="Avalanches"
					onClick={this.handleOpen}
					className={"IconClass"}
					labelStyle={styles.label}
					icon={<FontIcon 
						className={["material-icons","iconSize"].join(" ")}
						style={{'background-color': '#bdc3c7'}}>waves</FontIcon>}
					/>
				</div>
            </div>
        )
    }
}

export default IsdcAvalanches