import { Container  } from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserListScreen from './screens/UserListScreen';
import EditUserScreen from './screens/EditUserScreen';
import GroupScreen from './screens/GroupScreen';
import BlogScreen from './screens/BlogScreen';
import PodcastScreen from './screens/PodcastScreen';
import BlogDetailScreen from './screens/BlogDetailScreen';
import BlogListScreen from './screens/BlogListScreen';
import BlogEditScreen from './screens/BlogEditScreen';
import ForumListScreen from './screens/ForumListScreen';
import ForumEditScreen from './screens/ForumEditScreen';
import PodcastGridScreen from './screens/PodcastGridScreen';
import PodcastEditScreen from './screens/PodcastEditScreen';
import PodcastListScreen from './screens/PodcastListScreen';
import RecordingListScreen from './screens/RecordingListScreen';
import RecordingEditScreen from './screens/RecordingEditScreen';
import RecordingScreen from './screens/RecordingScreen';
import ProjectScreen from './screens/ProjectScreen';
import ProjectEditScreen from './screens/ProjectEditScreen';
import ProjectListScreen from './screens/ProjectListScreen';
import ResourceScreen from './screens/ResourceScreen'
import ResourceEditScreen from './screens/ResourceEditScreen';
import ResourceListScreen from './screens/ResourceListScreen';
import ProfileScreen from './screens/ProfileScreen';
import BioListScreen from './screens/BioListScreen';
import BioEditScreen from './screens/BioEditScreen';
import {HashRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
      <Router>
        <Header />
        <main className='py-3 colormc'>
            <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />} exact />
              <Route path='/login' element={<LoginScreen />}/>
              <Route path='/register' element={<RegisterScreen />}/>              
              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='/group/:id' element={<GroupScreen />} />
              <Route path='/blogs' element={<BlogScreen />} />
              <Route path='/blogs/:id' element={<BlogDetailScreen />} />
              <Route path='/bloglist' element={<BlogListScreen />}/>
              <Route path='/blog/:id/edit' element={<BlogEditScreen />}/>
              <Route path='/forumlist' element={<ForumListScreen />}/>
              <Route path='/forum/:id/edit' element={<ForumEditScreen />}/>
              <Route path='/podcastlist' element={<PodcastListScreen />}/>
              <Route path='/podcast/:id/edit' element={<PodcastEditScreen />}/>
              <Route path='/podcasts' element={<PodcastScreen />} />
              <Route path='/podcastgrid' element={<PodcastGridScreen />} />
              <Route path='/recordings' element={<RecordingScreen />} />              
              <Route path='/recordinglist' element={<RecordingListScreen />}/>
              <Route path='/recording/:id/edit' element={<RecordingEditScreen />}/>
              <Route path='/project' element={<ProjectScreen />}/>
              <Route path='/projectlist' element={<ProjectListScreen />}/>
              <Route path='/project/:id/edit' element={<ProjectEditScreen />}/>                            
              <Route path='/resource' element={<ResourceScreen />}/>
              <Route path='/resourcelist' element={<ResourceListScreen />}/>
              <Route path='/resource/:id/edit' element={<ResourceEditScreen />}/>
              <Route path='/profile' element={<ProfileScreen />}/>
              <Route path='/profilelist' element={<BioListScreen />}/>
              <Route path='/profile/:id/edit' element={<BioEditScreen />}/>                                                                                                                      
              <Route path='/admin/userlist' element={<UserListScreen />}/>
              <Route path='/admin/user/:id/edit' element={<EditUserScreen />}/>                          
            </Routes>
            </Container>
        </main>
        <Footer />  
      </Router>
  );
}

export default App;
