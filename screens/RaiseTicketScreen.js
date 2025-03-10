import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {pick} from '@react-native-documents/picker';

const RaiseTicketScreen = () => {
  // States for each field
  const [ticketType, setTicketType] = useState('');
  const [subType, setSubType] = useState('');
  const [priority, setPriority] = useState('');
  const [businessImpact, setBusinessImpact] = useState('');
  const [details, setDetails] = useState('');
  const [associatedTicket, setAssociatedTicket] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Handler for picking files
  const handleFilePick = async () => {
    try {
      const files = await pick({
        allowMultiSelection: true,
        type: ['*/*'], // Accept all file types
      });
      setSelectedFiles(files);
      Alert.alert('Files selected successfully!');
    } catch (err) {
      console.warn('File selection error:', err);
    }
  };

  // Handler for submitting the form
  const handleSubmit = () => {
    // Build an object with all form data
    const newTicket = {
      ticketType,
      subType,
      priority,
      businessImpact,
      details,
      associatedTicket,
      files: selectedFiles, // array of file objects
    };

    console.log('Submitting ticket:', newTicket);
    Alert.alert('Ticket submitted successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Raise a Ticket</Text>

      {/* Ticket Type */}
      <Text style={styles.label}>Ticket Type</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={ticketType}
          onValueChange={setTicketType}
          style={styles.picker}>
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Technical" value="technical" />
          <Picker.Item label="Billing" value="billing" />
          <Picker.Item label="Account" value="account" />
        </Picker>
      </View>

      {/* Sub-type */}
      <Text style={styles.label}>Sub-type</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={subType}
          onValueChange={setSubType}
          style={styles.picker}>
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Installation Issue" value="installation" />
          <Picker.Item label="Login Issue" value="login" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      {/* Priority */}
      <Text style={styles.label}>Priority</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={priority}
          onValueChange={setPriority}
          style={styles.picker}>
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Low" value="low" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="High" value="high" />
        </Picker>
      </View>

      {/* Business Impact */}
      <Text style={styles.label}>Business Impact</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={businessImpact}
          onValueChange={setBusinessImpact}
          style={styles.picker}>
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Minor" value="minor" />
          <Picker.Item label="Moderate" value="moderate" />
          <Picker.Item label="Severe" value="severe" />
        </Picker>
      </View>

      {/* Details (multiline) */}
      <Text style={styles.label}>Details</Text>
      <TextInput
        style={styles.textArea}
        multiline
        placeholder="Enter more details about the issue..."
        value={details}
        onChangeText={setDetails}
      />

      {/* Associated with (Select previous ticket) */}
      <Text style={styles.label}>Associated with</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={associatedTicket}
          onValueChange={setAssociatedTicket}
          style={styles.picker}>
          <Picker.Item label="Select previous ticket" value="" />
          <Picker.Item label="TT24/123" value="TT24/123" />
          <Picker.Item label="TT24/124" value="TT24/124" />
          <Picker.Item label="TT24/125" value="TT24/125" />
        </Picker>
      </View>

      {/* Upload Files */}
      <Text style={styles.label}>Upload Files</Text>
      <TouchableOpacity style={styles.dropArea} onPress={handleFilePick}>
        <Text style={styles.dropText}>Drop file here OR Upload File</Text>
      </TouchableOpacity>

      {/* Display selected file names */}
      {selectedFiles.map((file, index) => (
        <Text key={index} style={styles.fileName}>
          {file.name || file.uri}
        </Text>
      ))}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RaiseTicketScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },
  label: {
    marginTop: 15,
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  textArea: {
    backgroundColor: '#fff',
    minHeight: 80,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    textAlignVertical: 'top',
    padding: 10,
  },
  dropArea: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderStyle: 'dashed',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  dropText: {
    color: '#666',
  },
  fileName: {
    fontSize: 14,
    marginVertical: 2,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#9b59b6',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
