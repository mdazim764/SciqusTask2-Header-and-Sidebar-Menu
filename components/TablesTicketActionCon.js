{
  /* Main Content Columns (3 Tables) */
}

import data from '../data/data.json';
import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Text} from 'react-native-paper';

const TablesTicketActionCon = () => {
  // Toggles for showing the full list vs. partial list
  const [expandedTickets, setExpandedTickets] = useState(false);
  const [expandedQuickActions, setExpandedQuickActions] = useState(false);
  const [expandedContacts, setExpandedContacts] = useState(false);

  // Sample data from JSON file
  const {tickets, quickActions, contacts} = data;

  // Sample data (with extra items) to test scrolling
  // const tickets = [
  //   {id: 'TT24/123', description: 'Installation Issue', status: 'In-Process'},
  //   {id: 'TT24/124', description: 'Login Issue', status: 'Resolved'},
  //   {id: 'TT24/125', description: 'Network Issue', status: 'Pending'},
  //   {id: 'TT24/126', description: 'Software Bug', status: 'Pending'},
  //   {id: 'TT24/127', description: 'Hardware Issue', status: 'In-Process'},
  //   {id: 'TT24/128', description: 'Database Error', status: 'Pending'},
  //   {id: 'TT24/129', description: 'UI Glitch', status: 'In-Process'},
  //   {id: 'TT24/130', description: 'Email Not Sending', status: 'Resolved'},
  //   {id: 'TT24/131', description: 'Backup Failure', status: 'Pending'},
  //   {id: 'TT24/132', description: 'License Renewal', status: 'In-Process'},
  // ];

  // const quickActions = [
  //   {
  //     id: 'QA1',
  //     description: 'Payment against Invoice No. INV/24/12 is pending.',
  //     date: '2021-06-01',
  //   },
  //   {
  //     id: 'QA2',
  //     description:
  //       'Received request for document against ticket No. Tk/24/23422.',
  //     date: '2021-06-02',
  //   },
  //   {
  //     id: 'QA3',
  //     description: 'Renewal request for subscription ending in 3 days.',
  //     date: '2021-06-03',
  //   },
  //   {
  //     id: 'QA4',
  //     description: 'Password reset requested for user jdoe.',
  //     date: '2021-06-04',
  //   },
  //   {
  //     id: 'QA5',
  //     description: 'Server downtime scheduled for next week.',
  //     date: '2021-06-05',
  //   },
  //   {
  //     id: 'QA6',
  //     description: 'Upgrade required for new feature deployment.',
  //     date: '2021-06-06',
  //   },
  // ];

  // const contacts = [
  //   {id: 'C1', role: 'Account Manager', name: 'Amey Borade'},
  //   {id: 'C2', role: 'Technical Help', name: 'Amey Borade'},
  //   {id: 'C3', role: 'Finance Help', name: 'Amey Borade'},
  //   {id: 'C4', role: 'HR Help', name: 'John Smith'},
  //   {id: 'C5', role: 'Security Help', name: 'Jane Doe'},
  //   {id: 'C6', role: 'Legal Help', name: 'Attorney Bob'},
  //   {id: 'C7', role: 'Sales Help', name: 'Sara Sales'},
  // ];

  // Decide how many items to show in each table
  const visibleTickets = expandedTickets ? tickets : tickets.slice(0, 3);
  const visibleQuickActions = expandedQuickActions
    ? quickActions
    : quickActions.slice(0, 3);
  const visibleContacts = expandedContacts ? contacts : contacts.slice(0, 5);
  return (
    <View style={styles.contentColumn}>
      {/* My Tickets Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Tickets</Text>
        <ScrollView
          style={{flex: 1}}
          nestedScrollEnabled={true}
          scrollEnabled={expandedTickets}
          showsVerticalScrollIndicator={expandedTickets}>
          {visibleTickets.map((ticket, index) => (
            <View key={index} style={styles.tableItem}>
              <Text style={styles.tableRow}>
                <Text style={styles.tableLabel}>Ticket ID: </Text>
                {ticket.id}
              </Text>
              <Text style={styles.tableRow}>
                <Text style={styles.tableLabel}>Description: </Text>
                {ticket.description}
              </Text>
              <Text style={styles.tableRow}>
                <Text style={styles.tableLabel}>Status: </Text>
                {ticket.status}
              </Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={() => setExpandedTickets(!expandedTickets)}>
          <Text style={styles.viewAll}>
            {expandedTickets ? 'Show Less' : 'View All'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Need Quick Actions</Text>
        <ScrollView
          style={{flex: 1}}
          nestedScrollEnabled={true}
          scrollEnabled={expandedQuickActions}
          showsVerticalScrollIndicator={expandedQuickActions}>
          {visibleQuickActions.map((action, index) => (
            <View key={index} style={styles.tableItem}>
              <Text style={styles.tableRow}>
                <Text style={styles.tableLabel}>Action: </Text>
                {action.description}
              </Text>
              <Text style={styles.tableRow}>
                <Text style={styles.tableLabel}>Date: </Text>
                {action.date}
              </Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => setExpandedQuickActions(!expandedQuickActions)}>
          <Text style={styles.viewAll}>
            {expandedQuickActions ? 'Show Less' : 'View All'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contacts Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contacts</Text>
        <ScrollView
          style={{flex: 1}}
          nestedScrollEnabled={true}
          scrollEnabled={expandedContacts}
          showsVerticalScrollIndicator={expandedContacts}>
          {visibleContacts.map((contact, index) => (
            <View key={index} style={styles.tableItem}>
              <Text style={styles.tableRow}>
                <Text style={styles.tableLabel}>{contact.role}: </Text>
                {contact.name}
              </Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => setExpandedContacts(!expandedContacts)}>
          <Text style={styles.viewAll}>
            {expandedContacts ? 'Show Less' : 'View All'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  /* Main Table Container Column */
  contentColumn: {
    padding: 10,
  },

  /* Each Section (My Tickets, Quick Actions, Contacts) */
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 15,
    height: 350, // fixed size for each table
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  /* The items inside each table */
  tableItem: {
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableRow: {
    marginBottom: 2,
  },
  tableLabel: {
    fontWeight: 'bold',
  },

  /* Link at bottom of each table to expand or collapse */
  viewAll: {
    color: '#6b5b95',
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 5,
  },
});
export default TablesTicketActionCon;
