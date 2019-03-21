var setup_relations = function setup_relations(graph,relations){
    graph.connectionHandler.insertEdge = function(parent, id, value, source, target, style)
    {
        var doc = mxUtils.createXmlDocument();
        var node = doc.createElement('rel_'+source.getAttribute("type")+'_'+target.getAttribute("type"));
        node.setAttribute('type', "relation");

        //by default bidirectional edges are not allowed (disjoint)
        if(target.edges != null && target.edges.length>0){
            for (var i = 0; i < target.edges.length; i++) {
                if(target.edges[i].target.getId()==source.getId()){
                    alert(messages["setup_relations_bidirectional"]);
                    return null;
                }
            }
        }

        //setup custom attributes for relations
        if(relations){
            for (var i = 0; i < relations.length; i++) {
                if(relations[i]["rel_source_target"]=="and"){
                    if((relations[i]["source"].indexOf(source.getAttribute("type")) > -1) && (relations[i]["target"].indexOf(target.getAttribute("type"))> -1)){
                        for(var j = 0; j < relations[i]["attributes"].length; j++){
                            node.setAttribute(relations[i]["attributes"][j]["name"],relations[i]["attributes"][j]["def_value"]);
                        }
                    }
                }
                else{
                    if((relations[i]["source"].indexOf(source.getAttribute("type")) > -1) || (relations[i]["target"].indexOf(target.getAttribute("type"))> -1)){
                        for(var j = 0; j < relations[i]["attributes"].length; j++){
                            node.setAttribute(relations[i]["attributes"][j]["name"],relations[i]["attributes"][j]["def_value"]);
                        }
                    }
                }
            }
        }
        
        graph.getStylesheet().getDefaultEdgeStyle()[mxConstants.STYLE_ROUNDED] = true;
        graph.getStylesheet().getDefaultEdgeStyle()[mxConstants.STYLE_ORTHOGONAL] = false;
        graph.getStylesheet().getDefaultEdgeStyle()[mxConstants.STYLE_EDGE] = "elbowEdgeStyle";
        graph.getStylesheet().getDefaultEdgeStyle()[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CONNECTOR;
        graph.getStylesheet().getDefaultEdgeStyle()[mxConstants.STYLE_STARTARROW] = mxConstants.ARROW_DIAMOND;
        graph.getStylesheet().getDefaultEdgeStyle()[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC;
        graph.getStylesheet().getDefaultEdgeStyle()[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
        graph.getStylesheet().getDefaultEdgeStyle()[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        graph.getStylesheet().getDefaultEdgeStyle()[mxConstants.STYLE_STROKECOLOR] = "#000000"; // default is #6482B9
        graph.getStylesheet().getDefaultEdgeStyle()[mxConstants.STYLE_FONTCOLOR] = "#446299";

        var cell = graph.insertEdge(parent, id, node, source, target, style);
        return cell;
    };
}

export default setup_relations