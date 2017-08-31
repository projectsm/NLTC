class APIS{
	constructor(){
		this.state = {};
		this.layout();		
	}

	layout(){
		let html = `
			<h1>API Documentation</h1>
			<hr />
		`;
		$('#apis').html(html);
	}
}

let apis = new APIS();