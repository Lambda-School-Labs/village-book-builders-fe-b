import { Button, Drawer, Dropdown, Layout, Menu, PageHeader } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineDown, AiOutlineMenuUnfold } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { fetchHeadmasterProfile } from '../../../state/actions';
import Logout from '../../Logout.js';
import StudentProfileForm from '../../pages/Student/StudentProfileForm';
import MentorList from '../Mentor/MentorList.js';
import SchoolForm from '../School/SchoolForm.js';
import Schools from '../School/Schools.component.js';
import StudentForm from '../Student/StudentForm';
import StudentSearch from '../Student/StudentSearch';
import Village from '../Village/Village.component.js';
import VillageForm from '../Village/VillageForm.js';
import FilterSessionsByLibrary from './FilterSessionsByLibrary';
import HeadmasterHeader from './HeadmasterHeader';
import HeadmasterProfile from './HeadmasterProfile/Profile.js';
import ProfileForm from './HeadmasterProfile/ProfileForm.js';
import Mentees from './Mentees/Mentees.js';
import HeadmasterCalendar from './MentorMenteeMatching/HeadmasterCalendar';
import SidebarMenu from './SidebarMenu';

const HeadmasterDashboard = () => {
  const { Content } = Layout;
  const dispatch = useDispatch();
  const authState = useSelector(state => state.authReducer);
  const profile = useSelector(
    state => state.headmasterReducer.headmasterProfile
  );
  // sidebar collapsed state
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onClose = () => setDrawerVisible(prev => !prev);

  useEffect(() => {
    dispatch(fetchHeadmasterProfile(parseInt(authState.userId))); // change this later with login
  }, []);

  return (
    <>
      <Drawer
        title="Village Book Builder"
        placement="left"
        closable={true}
        onClose={onClose}
        visible={drawerVisible}
        width={250}
        bodyStyle={{ paddingRight: '0px', paddingLeft: '0px' }}
      >
        <SidebarMenu profile={profile} />
      </Drawer>
      <Layout>
        <HeadmasterHeader profile={profile} onClose={onClose} />
        <Content style={{ width: '100%' }} className="switch-wrapper">
          <Switch>
            <Layout style={{ width: '100%', backgroundColor: 'white' }}>
              <Route path="/dashboard">
                <Layout style={{ backgroundColor: 'white', width: '100%' }}>
                  <Layout.Sider theme="light">
                    <Menu mode="inline">
                      <Menu.Item>test</Menu.Item>
                    </Menu>
                  </Layout.Sider>
                  <HeadmasterCalendar />
                </Layout>
              </Route>
              <Route path="/mentor-pairings" component={Mentees} />
              <Route exact path="/profile" component={HeadmasterProfile} />
              <Route path="/profile/edit/:id" component={ProfileForm} />
              <Route
                path="/student/profile/edit/:id"
                component={StudentProfileForm}
              />
              <Route path="/student-search" component={StudentSearch} />
              <Route path="/mentor-list" component={MentorList} />
              <Route path="/studentregistration" component={StudentForm} />
              <Route path="/school-village">
                <Village />
                <Schools />
              </Route>
              <Route
                exact
                path="/village/edit/:villageId"
                component={VillageForm}
              />
              <Route
                exact
                path="/school/edit/:schoolId"
                component={SchoolForm}
              />
              <Route
                exact
                path="/sessions-by-library"
                component={FilterSessionsByLibrary}
              />

              <Route path="/logout" component={Logout} />
            </Layout>
          </Switch>
        </Content>
      </Layout>
    </>
  );
};

export default HeadmasterDashboard;
