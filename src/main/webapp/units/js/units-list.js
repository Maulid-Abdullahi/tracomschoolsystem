var courseUnit = {
    store: [{
              name: "ALGORITHMS",
              code: 'A1444'
          },{
              name: "DISCRETE MATHEMATICS",
              code: "232323"
          },{
              name: "DATABASES",
              code: "2555o9888"
    }],
    form: [{
          label: "Name",
          name: "cname",
          id: "course.cname",
          type: "text"
      },{
          label: "Code",
          name: "ccode",
          id: "course.code",
          type: "text"
    }]
};


TracomAcademy.Grid.apply(courseUnit);