import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Task(props: { onComplete: any; title: string }) {
  let { onComplete, title } = props;
  
  // const changeTitle = (newtitle: string) => {
  //   console.log("changing title");
  //   title = newtitle;
  //   onPress(newtitle);
  //   console.log(`title is now ${title}`);
  // }

  return (
    <View style={[styles.taskContainer, styles.elevation]}>
      <View style={styles.leftSide}>
        <TouchableOpacity style={styles.square}/>
        {/* <TextInput onChangeText={(text) => changeTitle(text)} multiline={true} defaultValue={title} onSubmitEditing={(event) => changeTitle(event.nativeEvent.text)} style={styles.itemText}/> */}
        <Text style={styles.itemText}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.circle} onPress={onComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
    taskContainer: {
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: "#55BCF6",
        borderWidth: 1,
        flexDirection: "row",
        borderRadius: 10,
        marginBottom: 10,
        padding: 15
      }, square: {
        width: 24,
        height: 24,
        backgroundColor: "#55BCF6",
        opacity: .4,
        borderRadius: 5,
      }, circle: {
        width: 12,
        height: 12,
        borderColor: "#55BCF6",
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 10
      }, itemText: {
        fontSize: 16,
        maxWidth: "80%",
        marginLeft: 10,
        textAlignVertical: 'center',
      }, leftSide: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center"
      }, shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }, elevation: {
        elevation: 12,
        shadowColor: '#55BCF6',
        opacity: .8
      }
});
