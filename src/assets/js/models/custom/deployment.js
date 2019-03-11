var deployment_main = function deployment_main(graph)
{
	deployment_constraints(graph);
	var data=[];
	data[0]="normal" //custom type
	data[1]=deployment_elements(); //custom elements
	data[2]=deployment_attributes(); //custom attributes
	data[3]=null; //custom relations
	data[4]=null; //custom properties styles
	data[5]=null; //custom labels
	data[6]=deployment_clon_cells();//custom clon cells
	data[7]=null;//custom constraints in element creation
	data[8]=null; //custom constraints in element creation
	return data;
	
	function deployment_constraints(graph){
		graph.multiplicities=[]; //reset multiplicities
		/*graph.multiplicities.push(new mxMultiplicity(
			true, "root", null, null, 0, 0, null,
			"Invalid connection",
			"Only shape targets allowed"));
		graph.multiplicities.push(new mxMultiplicity(
			true, "bundle", null, null, 0, 1, ["root","general"],
			"Only 1 target allowed",	
			"Only shape targets allowed"));*/
	}

	function deployment_elements(){
		var deployedTarget = {src:projectPath+"images/models/deployment/target.png", wd:50, hg:35, type:"target", style:"shape=target", pname:"target"};
		/*var general = {src:projectPath+"images/models/deployment/rectangle.png", wd:100, hg:35, type:"general", style:"", pname:"General deployment"};
		var leaf = {src:projectPath+"images/models/deployment/rectangle.png", wd:100, hg:35, type:"leaf", style:"", pname:"Leaf deployment"};
		var bundle = {src:projectPath+"images/models/deployment/bundle.png", wd:35, hg:35, type:"bundle", style:"shape=ellipse", pname:"Bundle"};*/
		
		var elements=[];
		elements[0]=deployedTarget;
		/*elements[1]=general;
		elements[2]=leaf;
		elements[3]=bundle;*/
		
		return elements;
	}

	function deployment_attributes(){
		var attributes=[];
		/*attributes[0]={
			"types":["bundle"],
			"custom_attributes":[{
				"name":"bundleType",
				"def_value":"AND"
			},
			{
				"name":"lowRange",
				"def_value":"1"
			},
			{
				"name":"highRange",
				"def_value":"1"
			}]
		};
		attributes[1]={
			"types":["leaf"],
			"custom_attributes":[{
				"name":"selected",
				"def_value":"false"
			}]

		};*/
		return attributes;
	}

	function deployment_relations(){
		var relations=[];
		/*relations[0]={
			"source":["general","leaf"],
			"rel_source_target":"and",
			"target":["general","leaf","root"],
			"attributes":[{
				"name":"relType",
				"def_value":"mandatory"
			}]
		}*/
	
		return relations;
	}

	function deployment_properties_styles(){
		var styles={};
		/*styles={
			"leaf":[{
					"attribute":"selected",
					"input_type":"checkbox",
					"onchange": deployment_custom_methods(3)
				}
			],
			"relation":[{
					"attribute":"relType",
					"input_type":"select",
					"input_values":["mandatory","optional","requires","excludes"]
				}
			],
			"bundle":[
				{
					"attribute":"bundleType",
					"input_type":"select",
					"input_values":["AND","OR","XOR","RANGE"],
					"onchange": deployment_custom_methods(0)
				},
				{
					"attribute":"lowRange",
					"input_type":"text",
					"input_text_type":"number",
					"def_display":"none",
					"display_check_attribute":"bundleType",
					"display_check_value":"RANGE",
					"display_check":"",
					"onchangerestrictive": deployment_custom_methods(1)
				},
				{
					"attribute":"highRange",
					"input_type":"text",
					"input_text_type":"number",
					"def_display":"none",
					"display_check_attribute":"bundleType",
					"display_check_value":"RANGE",
					"display_check":"",
					"onchangerestrictive": deployment_custom_methods(1)
				}
			]
		}*/

		return styles;
	}

	function deployment_custom_methods(pos){
		var methods=[]
		methods[0]=function(){
			document.getElementById("tr-lowRange").style.display="none";
			document.getElementById("tr-highRange").style.display="none";
			var val = document.getElementById("tr-bundleType").getElementsByTagName('select')[0].value;
			if(val=="RANGE"){
				document.getElementById("tr-lowRange").style.display="";
				document.getElementById("tr-highRange").style.display="";
			}
		};
		methods[1]=function(){
			var lowRange = document.getElementById("input-lowRange").value;
			var highRange = document.getElementById("input-highRange").value;
			if(lowRange>highRange){
				alert(messages["deployment_custom_range_check"]);
				return false;
			}
			return true;
		};
		methods[2]=function(graph){
			var deployment_root = graph.getModel().getCell("deployment");    
			var deployment_vertices = graph.getModel().getChildVertices(deployment_root);

			for (var i = 0; i < deployment_vertices.length; i++) {
				if(deployment_vertices[i].getAttribute("type")=="root"){
					alert(messages["deployment_custom_root_check"]);
					return false;
				}
			}
			return true;
		};
		methods[3]=function(){
			// Creates a new overlay with an image and a tooltip and makes it "transparent" to events
			var overlay = new mxCellOverlay(new mxImage('images/MX/check.png', 16, 16), 'Overlay tooltip');	
			if(this.checked){
				var overlay = new mxCellOverlay(new mxImage('images/MX/check.png', 16, 16), 'Overlay tooltip');	
				graph.addCellOverlay(graph.getModel().getCell(this.name), overlay);
			}else{
				graph.removeCellOverlay(graph.getModel().getCell(this.name));
			}
		};

		return methods[pos];
	}

	function deployment_labels(){
		var labels={};
		labels={
			"bundle":"bundleType"
		};

		return labels;
	}

	function deployment_constraints_in_creation(){
		var constraints_ic={};
		/*constraints_ic={
			"root":deployment_custom_methods(2)
		};*/

		return constraints_ic;
	}

	function deployment_clon_cells(){
		var clons={};
		clons={
			"deployment":"deployment"
		};

		return clons;
	}

	function deployment_overlay(){
		var func1=function(){
			var deployment_root = graph.getModel().getCell("deployment");
			var deployment_elements = graph.getModel().getChildEdges(deployment_root);
			for (var i = 0; i < deployment_elements.length; i++) {
				var source = deployment_elements[i].source;
				var type = source.getAttribute("type");
				if(type=="leaf"){
					var sel = source.getAttribute("selected");
					if(sel=="true"){
						var overlay = new mxCellOverlay(new mxImage('images/MX/check.png', 16, 16), 'Overlay tooltip');
						graph.addCellOverlay(source,overlay);
					}
				}
			}
		};

		return func1;
	}
	
}

export default deployment_main