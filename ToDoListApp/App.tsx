import { StatusBar } from 'expo-status-bar';
import Button from './components/Button';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import Task from './components/Task';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

interface TaskObject {
  completed: Boolean,
  title: string,
}

export default function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState<any>([]);
  const [tasksIsEmpty, setTasksIsEmpty] = useState(true);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  useEffect(() => {
    if (Object.keys(tasks).length === 0) {
      console.log('Tasks are empty');
      setTasksIsEmpty(true);
    }

    if (Object.keys(tasks).length > 0) {
      console.log('Tasks are NOT empty');
      console.log(tasks);
      setTasksIsEmpty(false);
    }
  }, [tasks]);
  
  const addTask = () => {
    if(text != ""){
      const newTask: TaskObject = {
        title: text,
        completed: false
      }
      setTasks([...tasks, newTask])
      setText("")
      console.log(`Task Submitted: ${text}`);
      console.log(tasks);
    } else {
      console.log(`Task Was Empty`);
      if (Object.keys(tasks).length === 0) {
        console.log('Tasks are empty');
        setTasksIsEmpty(true);
      }
  
      if (Object.keys(tasks).length > 0) {
        console.log('Tasks are NOT empty');
        console.log(tasks);
        setTasksIsEmpty(false);
      }
    }
  }

  // const editTask = (index: number, taskTitle: string) => {
  //   console.log(`Task Edited`);
  //   let tasksCopy = [...tasks];
  //   tasksCopy[index].title = taskTitle;
  //   setTasks(tasksCopy);
  //   setTasksIsEmpty(false);
  // }

  const completeTask = (index: number) => {
    let tasksCopy = [...tasks];
    tasksCopy[index].completed = true;
    //tasksCopy.splice(index, 1);
    setTasks(tasksCopy);
    console.log(`Task Completed`);
    if (Object.keys(tasks).length === 0) {
      console.log('Tasks are empty');
      setTasksIsEmpty(true);
    }

    if (Object.keys(tasks).length > 0) {
      console.log('Tasks are NOT empty');
      console.log(tasks);
      setTasksIsEmpty(false);
    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.outer}>
    <View style={styles.container}>
      <View style={styles.switch}>
        <Text style={styles.switchText}>
          Show Completed
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Today's tasks
        </Text>
      </View>
      {!!tasksIsEmpty 
      ? <View style={styles.items}><Text style={styles.subHeaderText}>Please add a task to proceed</Text></View>
      : <View style={styles.items}>
        {isEnabled
          ? <View> 
            {
            tasks.map((task: TaskObject, index: any) => {
              return ( 
                <View>
                  { !!task.completed && <Task key={index} onComplete={() => completeTask(index)} title={task.title}/>
                  }
                </View>
              )
            })
          }
          </View>
          : <View> 
            {
            tasks.map((task: TaskObject, index: any) => {
              return ( 
              <>
                <View>
                  { !task.completed && <Task key={index} onComplete={() => completeTask(index)} title={task.title}/>
                  }
                </View> 
              </>             
              )
            })
          }
          </View>
        }
        </View> 
      }
      <View style={styles.addTaskWrapper}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios"? "padding" : "height"} style={styles.keyboardView}>
          <TextInput style={styles.textInput} placeholder={"Write a Task"} defaultValue={text}
          onChangeText={(text) => {setText(text)}} onSubmitEditing={(event) => addTask()}/>
        </KeyboardAvoidingView>      
        <Button onPress={() => addTask()} title={"+"}/>
      </View>
      <StatusBar style="auto" />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    alignItems: 'center',
    justifyContent: "flex-start",
    padding: 28,
    marginTop: 40
  }, switch: {
    position: "absolute",
    top: 5,
    right: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }, switchText: {
    marginRight: 5,
    fontSize: 12
  }, outer: {
    flex: 1
  }, headerText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    alignItems: "flex-start"
  }, header: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    flexDirection: "row"
  }, subHeaderText: {
    fontSize: 18,
  }, taskContainer: {

  }, addTaskWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  }, textInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#55BCF6",
    borderWidth: 1,
    width: "100%",
    height: 50,
    padding: 15

  }, keyboardView: {
    width: "80%",
  }, items: {
    marginTop: 25,
    width: "100%",
  }
});
