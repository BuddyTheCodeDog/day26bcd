<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    
    let todos = []
    let i = 1;
   
    async function getToDos(){
        const result = await axios.get("http://localhost:3002/test");
       
        return result.data;

    }

    onMount(async function(){
        todos = await getToDos();
        todos.forEach(todo => {
  console.log(todo.name);
});

    });

   
</script>

{#each todos as todo}
{todo.name}

<br/>
{/each}

<div class="overflow-x-auto">
    <table class="table w-full">
      <!-- head -->

      
      <thead>
        <tr>
          <th></th>
          <th>What</th>
          <th>When</th>
          
        </tr>
      </thead>
      <tbody>

        {#each todos as todo, i}
        
        <tr>
            <th>{i+1}</th>
           
            <td>{todo.name}</td>
            
            
          </tr>
        
        {/each}
        
      </tbody>
    </table>
  </div>